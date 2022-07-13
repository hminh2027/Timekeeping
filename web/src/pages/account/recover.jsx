import { useRouter } from "next/router";
import RecoveryLayout from "../../components/Layout/RecoveryLayout";
import RecoverPassword from "../../components/page/account/RecoverPassword";
const recover = () => {
  const router = useRouter();
  const { token } = router.query;
  return <RecoverPassword token={token} />;
};
recover.layout = RecoveryLayout;

export default recover;
