select rn.RedNoteID, mc.Name, mc.Lyrics, mc.Mood, mc.SubMood, mc.TimeMS, mc.FileURL, os.Genre from RedNote rn 
    join MusicClip mc on rn.MusicClipID = mc.MusicClipID
    join OriginalSong os on mc.OriginalSongID = os.OriginalSongID;

select rn.RedNoteID, mc.Name, mc.Lyrics, mc.Mood, mc.SubMood, mc.TimeMS, mc.FileURL, os.Genre, ss.PurchaseURL
from RedNote rn 
    join MusicClip mc on rn.MusicClipID = mc.MusicClipID
    join OriginalSong os on mc.OriginalSongID = os.OriginalSongID
    join SongStore ss on ss.OriginalSongID = mc.OriginalSongID;

INSERT INTO `RedNoteDatabase`.`ClickEvent`
(
`DateTime`,
`EventType`,
`EndUserID`,
`MessageID`,
`RedNoteID`,
`PartnerID`)
VALUES
(NOW(),
'test',
1,
1,
1,
1
);

SELECT LAST_INSERT_ID() LAST_ID;

select * from ClickEvent;

select * from Message
