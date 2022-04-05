const express = require('express');
const router = express.Router();
const multer = require('multer');
const { signup, signin, signout, requireSigninUser, adminMiddleware,
  readUser,getPaginatedSearchUser,updateUser,
  uploadPictureUser, resetPasswordUser, addNotification, loginToken, addSavePlace, getSavePlace} = require('../controllers/auth');


  const {addMainAnimal, addSubAnimal,getAllAnimals, getOneAnimals, updateOneAnimals, getAllSubAnimalsByMainId, 
    getOneSubAnimals, updateOneSubAnimals, deleteOneAnimals, deleteOneSubAnimals, getAllAnimalMainSub } = require('../controllers/animals')


  const {addLocation, addSubLocation, getAllLocation, getAllSubLocalByMainId, getOneLocation, 
    getOneSubLocal, updateOneLocation, updateOneSubLocal, deleteOneLocation, deleteOneSubLocation, getAllLocationMainSub} = require('../controllers/location')

const {addMainTrips, getAllTrips, getOneTrips, updateOneTrips, deleteOneTrips} = require('../controllers/trips');

const {addManageMedia, getAllManageMedia, getOneManageMedia, updateOneManageMedia, 
  deleteOneManageMedia, addLogo, deleteLogo, getLogo, addWaterMarkPhoto, addWaterMarkLetter, getWatermark, deleteWatermark} = require('../controllers/manageMedia');

const {addPhotosVideo, getArchived, deletePhotoVid, updatePhotoWatermark} = require('../controllers/managePhotoVideo');
 
const {addMainUrl, addSubUrl, getOneMainUrl, getOneSubUrl, updateOneMainUrl, updateOneSubUrl, deleteOneMainUrl, deleteOneSubUrl, getSubUrl, getAllMainUrl, getOnePublicPhotoVideo,getAllNonePublicPhotoVideo, getAllNonePublicPhotoVideo2, getAllNonePublicPhotoVideo3, getAllPublicManageMedia } = require('../controllers/url');

const {addManagePage, getAllManagePage, getOneManagePage, deleteOneManagePage, updateOneManagePage} = require('../controllers/managePage');
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({limits: {

    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
  dest: 'uploads/' })


// validators
const { runValidation } = require('../validators');
const { userSignupValidator } = require('../validators/auth');



router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', runValidation, signin);
router.get('/signout', signout);
router.get('/login/token', loginToken)
router.get('/user/profile', requireSigninUser, readUser);
router.put('/user/update-profile', requireSigninUser, updateUser);
router.put('/user/upload/avatar', requireSigninUser, upload.single('productImage'), uploadPictureUser);
router.put('/user/change-password', resetPasswordUser);

router.post('/admin/add/animal', requireSigninUser, addMainAnimal);
router.get('/admin/get/query/animal', requireSigninUser, getAllAnimals);
router.get('/admin/get/one/animal', requireSigninUser, getOneAnimals);
router.put('/admin/update/animal', requireSigninUser, updateOneAnimals);
router.delete('/admin/delete/animal', requireSigninUser, deleteOneAnimals);


router.post('/admin/add/sub/animal', requireSigninUser, addSubAnimal);
router.get('/admin/get/query/sub-animal', requireSigninUser, getAllSubAnimalsByMainId);
router.get('/admin/get/one/sub-animal', requireSigninUser, getOneSubAnimals);
router.put('/admin/update/sub-animal', requireSigninUser, updateOneSubAnimals);
router.delete('/admin/delete/sub-animal', requireSigninUser, deleteOneSubAnimals);

router.post('/admin/add/location', requireSigninUser, addLocation);
router.get('/admin/get/query/location', requireSigninUser, getAllLocation);
router.get('/admin/get/one/location', requireSigninUser, getOneLocation);
router.put('/admin/update/location', requireSigninUser, updateOneLocation);
router.delete('/admin/delete/location', requireSigninUser, deleteOneLocation);


router.post('/admin/add/sub/location', requireSigninUser, addSubLocation);
router.get('/admin/get/query/sub-location', requireSigninUser, getAllSubLocalByMainId);
router.get('/admin/get/one/sub-location', requireSigninUser, getOneSubLocal);
router.put('/admin/update/sub-location', requireSigninUser, updateOneSubLocal);
router.delete('/admin/delete/sub-location', requireSigninUser, deleteOneSubLocation);

router.post('/admin/add/trips', requireSigninUser, addMainTrips);
router.get('/admin/get/trips', requireSigninUser, getAllTrips);
router.get('/admin/get/one/trips', requireSigninUser, getOneTrips);
router.put('/admin/update/trips', requireSigninUser, updateOneTrips);
router.delete('/admin/delete/trips', requireSigninUser, deleteOneTrips);


router.post('/admin/post/video-photo', requireSigninUser, addPhotosVideo);
router.get('/admin/get/video-photo', requireSigninUser, getArchived);
router.delete('/admin/delete/video-photo', requireSigninUser, deletePhotoVid);
router.put('/admin/update/video-photo', requireSigninUser, updatePhotoWatermark);



router.post('/admin/post/manage/media', requireSigninUser, addManageMedia);
router.get('/admin/get/manage/media', requireSigninUser, getAllManageMedia);
router.get('/admin/get/one/manage/media', requireSigninUser, getOneManageMedia);
router.delete('/admin/delete/manage/media/:slug', requireSigninUser, deleteOneManageMedia);
router.put('/admin/update/manage/media/:slug', requireSigninUser, updateOneManageMedia);





router.post('/admin/add/user', requireSigninUser, adminMiddleware, signup);
router.get('/admin/get/query/user/:slug', requireSigninUser, adminMiddleware, getPaginatedSearchUser);
router.get('/admin/get/one/user/:slug', requireSigninUser, adminMiddleware, readUser);
router.put('/admin/update/user/:slug', requireSigninUser, adminMiddleware, updateUser);

router.post('/admin/add/logo', requireSigninUser, addLogo);
router.get('/admin/get/one/logo', getLogo);
router.delete('/admin/delete/logo', requireSigninUser, deleteLogo);


router.post('/admin/add/watermark/photo', requireSigninUser, addWaterMarkPhoto);
router.post('/admin/add/watermark/letter', requireSigninUser, addWaterMarkLetter);
router.get('/admin/get/one/watermark', requireSigninUser, getWatermark);
router.delete('/admin/delete/watermark', requireSigninUser, deleteWatermark);

router.post('/admin/add/page', requireSigninUser, addManagePage);
router.get('/admin/get/page', requireSigninUser, getAllManagePage);
router.get('/admin/get/one/page', requireSigninUser, getOneManagePage);
router.delete('/admin/delete/page', requireSigninUser, deleteOneManagePage);
router.put('/admin/update/page', requireSigninUser, updateOneManagePage);



router.post('/public/post/main/url', addMainUrl);
router.get('/public/get/main/url', getAllMainUrl);
router.get('/public/get/one/main/url', getOneMainUrl);
router.delete('/public/delete/main/url', deleteOneMainUrl);
router.put('/public/update/main/url', updateOneMainUrl);

router.post('/public/post/sub/url', addSubUrl);
router.get('/public/get/sub/url', getSubUrl);
router.get('/public/get/one/sub/url', getOneSubUrl);
router.delete('/public/delete/sub/url', deleteOneSubUrl);
router.put('/public/update/sub/url', updateOneSubUrl);
router.get('/public/get/one/page', getOneManagePage);
router.get('/public/get/all/page', getAllManagePage);
router.get('/public/get/one/photo-video', getOnePublicPhotoVideo);
router.get('/public/get/one/none/photo-video', getAllNonePublicPhotoVideo);
router.get('/public/get/one/tes/pv', getAllNonePublicPhotoVideo2);
router.get('/public/get/one/test/vp', getAllNonePublicPhotoVideo3);
router.get('/public/get/main/page', getAllPublicManageMedia);

router.get('/public/get/main/animal', getAllAnimalMainSub);

router.get('/public/get/main/location', getAllLocationMainSub);




module.exports = router;
 