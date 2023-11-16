import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

import Heading from "../Heading";

interface Props {
  price: number;
  onChange: (name: string, value: string | React.ChangeEvent<any>) => void;
}

const PriceStep = ({ price, onChange }: Props): React.ReactNode => {
  const { t } = useTranslation();
  const [touched, setTouched] = useState(false);
  return (
    <>
      <Heading title={t("rent.price.title")} description={t("rent.price.subtitle")} />
      <TextField
        variant="outlined"
        id="price"
        label={t("rent.price.label")}
        color="secondary"
        onChange={e => {
          setTouched(true);
          onChange("price", e.target.value);
        }}
        type="number"
        value={price}
        error={!price && touched}
        helperText={!price && touched && t("rent.price.error")}
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <IconBox>
              <RiMoneyDollarBoxLine size={24} />
            </IconBox>
          ),
        }}
      />
    </>
  );
};

const IconBox = styled.div`
  display: flex;
  margin-inline-end: 8px;
`;

export default PriceStep;
