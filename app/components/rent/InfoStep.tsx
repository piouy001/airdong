import React from "react";
import { useTranslation } from "react-i18next";

import Counter from "./Counter";
import Header from "./Header";

interface Props {
  data: {
    name: string;
    title: string;
    subtitle: string;
    value: number;
  }[];
  onChange: (name: string, value: any) => void;
}

const InfoStep = ({ data, onChange }: Props): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t("rent.info.title")} description={t("rent.info.desc")} />
      {data.map(item => (
        <Counter
          key={item.name}
          name={item.name}
          title={item.title}
          subtitle={item.subtitle}
          value={item.value}
          onChange={onChange}
        />
      ))}
    </>
  );
};

export default InfoStep;
