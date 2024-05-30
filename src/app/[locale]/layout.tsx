import clsx from "clsx";
import { Gabarito } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";

const nokora = Gabarito({ weight: ["400", "700", "900"], subsets: ["latin"] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};
//// META DATA ////
export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "IndexPage" });

  return {
    title: t("MetaTitle"),
    description: t("MetaDescription"),
  };
}

//// CHILDREN ////
export default function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={clsx(nokora.className, "flex flex-col")}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
