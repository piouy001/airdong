"use client";

import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useCallback } from "react";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

import i18n from "i18n";
import Transitions from "styles/transitions";
import { FontWeight } from "styles/typography";

const categories = [
  { label: i18n.t("category.beachs.label"), description: i18n.t("category.beach.desc"), icon: TbBeach },
  { label: i18n.t("category.windmills.label"), description: i18n.t("category.windmills.desc"), icon: GiWindmill },
  { label: i18n.t("category.modern.label"), description: i18n.t("category.modern.desc"), icon: MdOutlineVilla },
  { label: i18n.t("category.countryside.label"), description: i18n.t("category.countryside.desc"), icon: TbMountain },
  { label: i18n.t("category.pools.label"), description: i18n.t("category.pools.desc"), icon: TbPool },
  { label: i18n.t("category.islands.label"), description: i18n.t("category.islands.desc"), icon: GiIsland },
  { label: i18n.t("category.lake.label"), description: i18n.t("category.lake.desc"), icon: GiBoatFishing },
  { label: i18n.t("category.skiing.label"), description: i18n.t("category.skiing.desc"), icon: FaSkiing },
  { label: i18n.t("category.castles.label"), description: i18n.t("category.castles.desc"), icon: GiCastle },
  { label: i18n.t("category.camping.label"), description: i18n.t("category.camping.desc"), icon: GiForestCamp },
  { label: i18n.t("category.arctic.label"), description: i18n.t("category.arctic.desc"), icon: BsSnow },
  { label: i18n.t("category.cave.label"), description: i18n.t("category.cave.desc"), icon: GiCaveEntrance },
  { label: i18n.t("category.desert.label"), description: i18n.t("category.desert.desc"), icon: GiCactus },
  { label: i18n.t("category.barns.label"), description: i18n.t("category.barns.desc"), icon: GiBarn },
  { label: i18n.t("category.lux.label"), description: i18n.t("category.lux.desc"), icon: IoDiamond },
];

const Categories = (): React.ReactNode => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const isSelectedCategory = params?.get("category");
  const isMainPage = pathname === "/";
  const handleClick = useCallback(
    (label: string) => {
      const currentQuery = params ? qs.parse(params.toString()) : {};

      const updatedQuery = {
        ...currentQuery,
        category: params?.get("category") === label ? null : label,
      };

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true },
      );

      router.push(url);
    },
    [router, params],
  );

  if (!isMainPage) return null;

  return (
    <Container>
      {categories.map(item => (
        <Item
          key={item.label}
          $isSelected={item.label === isSelectedCategory}
          onClick={() => {
            handleClick(item.label);
          }}
        >
          <item.icon size={24} />
          <Label variant="subtitle1">{item.label}</Label>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 40px;
  padding-block-start: 16px;
  background: ${({ theme }) => theme.palette.background.default};
  overflow-x: auto;
  gap: 16px;
  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 8px;
  }
`;
const Item = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 36px;
  padding-block: 12px;
  color: ${({ theme, $isSelected }) => ($isSelected ? theme.palette.text.primary : theme.palette.text.secondary)};
  border-bottom: 2px solid
    ${({ theme, $isSelected }) => ($isSelected ? theme.palette.text.primary : theme.palette.background.default)};
  transition:
    color,
    border-color ${Transitions.Primary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
    border-color: ${({ theme, $isSelected }) => ($isSelected ? theme.palette.text.primary : theme.palette.divider)};
  }
`;
const Label = styled(Typography)`
  font-weight: ${FontWeight.SemiBold};
`;

export default Categories;
