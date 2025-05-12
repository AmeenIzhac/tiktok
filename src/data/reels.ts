import { supabase } from '../lib/supabase';
import { Reel } from '../types';

export const fetchReels = async (): Promise<Reel[]> => {
  // First, get the list of videos from the storage bucket
  const { data: storageData, error: storageError } = await supabase
    .storage
    .from('bucket1')
    .list();

  if (storageError) {
    console.error('Error fetching videos from storage:', storageError);
    return [];
  }

  // Filter for video files
  const videoFiles = storageData.filter(file => 
    file.name.match(/\.(mp4|webm|mov)$/i)
  );

  // Get signed URLs for each video
  const reels = await Promise.all(
    videoFiles.map(async (file) => {
      const { data: { publicUrl } } = supabase
        .storage
        .from('bucket1')
        .getPublicUrl(file.name);

      return {
        id: file.id,
        videoUrl: publicUrl,
        user: {
          id: 'default',
          username: 'Language Learner',
          profileImage: 'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3BsYXlcLzBiN2Y0ZTliLWY1OWMtNDAyNC05ZjA2LWIzZGMxMjg1MGFiNy0xOTIwLTEwODAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0='
        },
        caption: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
        likes: 0,
        liked: false
      };
    })
  );

  return reels;
};