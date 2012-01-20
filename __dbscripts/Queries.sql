select rn.RedNoteID, mc.Name, mc.Lyrics, mc.Mood, mc.SubMood, mc.TimeMS, mc.FileURL, os.Genre from RedNote rn 
    join MusicClip mc on rn.MusicClipID = mc.MusicClipID
    join OriginalSong os on mc.OriginalSongID = os.OriginalSongID;

select rn.RedNoteID, mc.Name, mc.Lyrics, mc.Mood, mc.SubMood, mc.TimeMS, mc.FileURL, os.Genre,
       p.Name, ssp.URL
from RedNote rn 
    join MusicClip mc on rn.MusicClipID = mc.MusicClipID
    join OriginalSong os on mc.OriginalSongID = os.OriginalSongID
    join SongStore ss on ss.OriginalSongID = mc.OriginalSongID
    join SongStorePartner ssp on ssp.SongStoreID = ss.SongStoreID
    join Partner p on p.PartnerID = ssp.PartnerID

