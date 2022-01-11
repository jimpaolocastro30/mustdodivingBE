const express = require('express');
const router = express.Router();
const multer = require('multer');
const { signup, signin, signout, requireSigninUser, adminMiddleware,
  readUser,getPaginatedSearchUser,updateUser,
  uploadPictureUser, resetPasswordUser, addNotification, loginToken, addSavePlace, getSavePlace} = require('../controllers/auth');


  const {addMainAnimal, addSubAnimal,getAllAnimals, getOneAnimals, updateOneAnimals, getAllSubAnimalsByMainId, 
    getOneSubAnimals, updateOneSubAnimals, deleteOneAnimals, deleteOneSubAnimals } = require('../controllers/animals')


  const {addLocation, addSubLocation, getAllLocation, getAllSubLocalByMainId, getOneLocation, 
    getOneSubLocal, updateOneLocation, updateOneSubLocal, deleteOneLocation, deleteOneSubLocation} = require('../controllers/location')

const {addMainTrips, getAllTrips, getOneTrips, updateOneTrips, deleteOneTrips} = require('../controllers/trips');

const {addPhotosVideo, getArchived, deletePhotoVid} = require('../controllers/managePhotoVideo');
  
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


router.post('/admin/post/video-photo',  addPhotosVideo);
router.get('/admin/get/video-photo',  getArchived);
router.delete('/admin/delete/video-photo', deletePhotoVid);



router.post('/admin/add/user', requireSigninUser, adminMiddleware, signup);
router.get('/admin/get/query/user/:slug', requireSigninUser, adminMiddleware, getPaginatedSearchUser);
router.get('/admin/get/one/user/:slug', requireSigninUser, adminMiddleware, readUser);
router.put('/admin/update/user/:slug', requireSigninUser, adminMiddleware, updateUser);


module.exports = router;
