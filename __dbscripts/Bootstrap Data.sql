/* Test bootstrap data */
USE RedNoteDatabase;

DELETE FROM `RedNoteDatabase`.`OriginalSong` WHERE OriginalSongID >= 1;
DELETE FROM `RedNoteDatabase`.`MusicClip` WHERE MusicClipID >= 1;
DELETE FROM `RedNoteDatabase`.`RedNote` WHERE RedNoteID >= 1;
DELETE FROM `RedNoteDatabase`.`Partner` WHERE PartnerID >= 1;
DELETE FROM `RedNoteDatabase`.`SongStorePartner` WHERE SongStorePartnerID >= 1;
DELETE FROM `RedNoteDatabase`.`Store` WHERE StoreID >= 1;
DELETE FROM `RedNoteDatabase`.`SongStore` WHERE SongStoreID >= 1;
DELETE FROM `RedNoteDatabase`.`Sponsor` WHERE SponsorID >= 1;
DELETE FROM `RedNoteDatabase`.`PurchasePackage` WHERE PackageID >= 1;

/*---------------------------------------*/
/*--- Partners --------------------------*/
/*---------------------------------------*/
INSERT INTO `RedNoteDatabase`.`Partner` (`PartnerID`,`OrganizationID`,`Name`)
VALUES(1,1, 'Pandora');

/*---------------------------------------*/
/*--- Sponsors --------------------------*/
/*---------------------------------------*/
INSERT INTO `RedNoteDatabase`.`Sponsor` (`SponsorID`,`OrganizationID`,`Name`,`LoURL`,`BackgroundColor`,`BackgroundURL`)
VALUES (1,1,'Coca Cola','http://testserver.com/sponsors/1/logo.jpg','#FF0000',null);

INSERT INTO `RedNoteDatabase`.`PurchasePackage` (`PackageID`,`SponsorID`,`Name`,`AdditionalInfo`,`MaxCount`)
VALUES(1,1,'Trial Package','',1000);

/*---------------------------------------*/
/*--- Stores -------------------------*/
/*---------------------------------------*/
INSERT INTO `RedNoteDatabase`.`Store` (`StoreID`,`Name`)
VALUES(1,'iTunes');

/*---------------------------------------*/
/*--- RedNotes --------------------------*/
/*---------------------------------------*/
INSERT INTO `RedNoteDatabase`.`OriginalSong` (`OriginalSongID`,`Name`,`Artist`,`Album`,`Track`,`Lyrics`,`Genre`)
VALUES(1, 'Stairway To Heaven', 'Led Zeppelin', 'LED ZEPPELIN IV', 4, '', 'Rock');

INSERT INTO `RedNoteDatabase`.`SongStore` (`SongStoreID`,`StoreID`,`OriginalSongID`,`SongIdentifier`,`PurchaseURL`)
VALUES(1,1,1,'SI1','http//itunes.com?id=si1&pid=1');

INSERT INTO `RedNoteDatabase`.`MusicClip`
(`MusicClipID`,`OriginalSongID`,`Name`,`Lyrics`,`Mood`,`SubMood`,`TimeMS`,`SizeKB`,`FileType`,`FileURL`)
VALUES(1,1,'Stairway To Heaven','Stairway To Heaven','Serious','Somber',12000,240,'.mp3','http://testserver.com/clip1.mp3');

INSERT INTO `RedNoteDatabase`.`RedNote`
(`RedNoteID`,`MusicClipID`,`PackageID`,`MaxCount`)
VALUES(1,1,1,1000);

/*---------------------------------------*/
INSERT INTO `RedNoteDatabase`.`OriginalSong` (`OriginalSongID`,`Name`,`Artist`,`Album`,`Track`,`Lyrics`,`Genre`)
VALUES(2, 'Whole Lotta Love', 'Led Zeppelin', 'LED ZEPPELIN II', 1, '', 'Rock');

INSERT INTO `RedNoteDatabase`.`SongStore` (`SongStoreID`,`StoreID`,`OriginalSongID`,`SongIdentifier`,`PurchaseURL`)
VALUES(2,1,2,'SI2','http//itunes.com?id=si2&pid=1');

INSERT INTO `RedNoteDatabase`.`MusicClip`
(`MusicClipID`,`OriginalSongID`,`Name`,`Lyrics`,`Mood`,`SubMood`,`TimeMS`,`SizeKB`,`FileType`,`FileURL`)
VALUES(2,2,'Whole Lotta Love','Whole Lotta Love','Serious','Loud',12000,240,'.mp3','http://testserver.com/clip2.mp3');

INSERT INTO `RedNoteDatabase`.`RedNote`
(`RedNoteID`,`MusicClipID`,`PackageID`,`MaxCount`)
VALUES(2,2,1,1000);

/*---------------------------------------*/
INSERT INTO `RedNoteDatabase`.`OriginalSong` (`OriginalSongID`,`Name`,`Artist`,`Album`,`Track`,`Lyrics`,`Genre`)
VALUES(3, 'Black Dog', 'Led Zeppelin', 'LED ZEPPELIN IV', 1, '', 'Rock');

INSERT INTO `RedNoteDatabase`.`SongStore` (`SongStoreID`,`StoreID`,`OriginalSongID`,`SongIdentifier`,`PurchaseURL`)
VALUES(3,1,3,'SI3','http//itunes.com?id=si3&pid=1');

INSERT INTO `RedNoteDatabase`.`MusicClip`
(`MusicClipID`,`OriginalSongID`,`Name`,`Lyrics`,`Mood`,`SubMood`,`TimeMS`,`SizeKB`,`FileType`,`FileURL`)
VALUES(3,3,'Black Dog','Black Dog','Serious','Loud',12000,240,'.mp3','http://testserver.com/clip2.mp3');

INSERT INTO `RedNoteDatabase`.`RedNote`
(`RedNoteID`,`MusicClipID`,`PackageID`,`MaxCount`)
VALUES(3,3,1,1000);
