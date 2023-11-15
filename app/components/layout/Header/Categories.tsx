"use client";

import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
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

import Transitions from "styles/transitions";
import { FontWeight } from "styles/typography";

export const categories = [
  { key: "beachs", label: "category.beachs.label", description: "category.beachs.desc", icon: TbBeach },
  {
    key: "windmills",
    label: "category.windmills.label",
    description: "category.windmills.desc",
    icon: GiWindmill,
  },
  {
    key: "modern",
    label: "category.modern.label",
    description: "category.modern.desc",
    icon: MdOutlineVilla,
  },
  {
    key: "countryside",
    label: "category.countryside.label",
    description: "category.countryside.desc",
    icon: TbMountain,
  },
  { key: "pools", label: "category.pools.label", description: "category.pools.desc", icon: TbPool },
  {
    key: "islands",
    label: "category.islands.label",
    description: "category.islands.desc",
    icon: GiIsland,
  },
  { key: "lake", label: "category.lake.label", description: "category.lake.desc", icon: GiBoatFishing },
  {
    key: "skiing",
    label: "category.skiing.label",
    description: "category.skiing.desc",
    icon: FaSkiing,
  },
  {
    key: "castles",
    label: "category.castles.label",
    description: "category.castles.desc",
    icon: GiCastle,
  },
  {
    key: "camping",
    label: "category.camping.label",
    description: "category.camping.desc",
    icon: GiForestCamp,
  },
  { key: "arctic", label: "category.arctic.label", description: "category.arctic.desc", icon: BsSnow },
  {
    key: "cave",
    label: "category.cave.label",
    description: "category.cave.desc",
    icon: GiCaveEntrance,
  },
  {
    key: "desert",
    label: "category.desert.label",
    description: "category.desert.desc",
    icon: GiCactus,
  },
  { key: "barns", label: "category.barns.label", description: "category.barns.desc", icon: GiBarn },
  { key: "lux", label: "category.lux.label", description: "category.lux.desc", icon: IoDiamond },
];

const Categories = (): React.ReactNode => {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const isSelectedCategory = params?.get("category");
  const isMainPage = pathname === "/";
  const handleClick = useCallback(
    (key: string) => {
      const currentQuery = params ? qs.parse(params.toString()) : {};

      const updatedQuery = {
        ...currentQuery,
        category: params?.get("category") === key ? null : key,
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
          key={item.key}
          $isSelected={item.key === isSelectedCategory}
          onClick={() => {
            handleClick(item.key);
          }}
        >
          <item.icon size={24} />
          <Label variant="subtitle1">{t(item.label)}</Label>
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
