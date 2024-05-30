import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import HeaderWhite from "../../components/HeaderWhite";
type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations("IndexPage");
  const h = useTranslations("Navigation");

  const headerMessages = {
    Home: h("Home"),
    About: h("About"),
  };

  return (
    <>
      <HeaderWhite messages={headerMessages} />
      <div className="bg-white py-16 max-w-7xl px-4 mx-auto">{t("Title")}</div>
    </>
  );
}
