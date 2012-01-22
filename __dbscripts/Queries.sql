select rn.RedNoteID, mc.Name, mc.Lyrics, mc.Mood, mc.SubMood, mc.TimeMS, mc.FileURL, os.Genre from RedNote rn 
    join MusicClip mc on rn.MusicClipID = mc.MusicClipID
    join OriginalSong os on mc.OriginalSongID = os.OriginalSongID;

select rn.RedNoteID, mc.Name, mc.Lyrics, mc.Mood, mc.SubMood, mc.TimeMS, mc.FileURL, os.Genre, ss.PurchaseURL
from RedNote rn 
    join MusicClip mc on rn.MusicClipID = mc.MusicClipID
    join OriginalSong os on mc.OriginalSongID = os.OriginalSongID
    join SongStore ss on ss.OriginalSongID = mc.OriginalSongID


