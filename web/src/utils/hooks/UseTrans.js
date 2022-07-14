import { useRouter } from "next/router";
import en from "../../../public/locales/en/translation";
import vi from "../../../public/locales/vi/translation";

const UseTrans = () => {
  const { locale } = useRouter();

  const trans = locale === "vi" ? vi : en;

  return trans;
};

export default UseTrans;
