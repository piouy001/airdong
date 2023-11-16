"use client";

import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TbPhotoPlus } from "react-icons/tb";

import Transitions from "styles/transitions";

import Heading from "../Heading";

declare global {
  // eslint-disable-next-line vars-on-top, no-var, no-unused-vars
  var cloudinary: any;
}

interface Props {
  value: string;
  onChange: (name: string, value: any) => void;
}

const ImagesStep = ({ value, onChange }: Props): React.ReactNode => {
  const { t } = useTranslation();

  const handleUpload = useCallback(
    (result: any) => {
      onChange("imageSrc", result.info.secure_url);
    },
    [onChange],
  );

  return (
    <>
      <Heading title={t("rent.images.title")} description={t("rent.images.desc")} />
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="iqvkpmok"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => (
          <Item onClick={() => open?.()}>
            <TbPhotoPlus size={50} />
            <Label variant="h4">{t("rent.images.label")}</Label>
            {value && (
              <UploadImage>
                <Image fill src={value} style={{ objectFit: "cover" }} alt="upload-image" />
              </UploadImage>
            )}
          </Item>
        )}
      </CldUploadWidget>
    </>
  );
};

const Item = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 80px;
  color: ${({ theme }) => theme.palette.text.secondary};
  border: 2px dashed ${({ theme }) => theme.palette.divider};
  transition: opacity ${Transitions.Primary};
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const Label = styled(Typography)``;
const UploadImage = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

export default ImagesStep;
