const router = express.Router();
const v1Root = Routes.api.v1;

router.use('/session', v1Root.session);
router.use('/profile', v1Root.profile);

export default router;
