import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import LoginModal from "components/modal/LoginModal";
import { useModal } from "contexts/ModalContext";
import { useSnackbar } from "contexts/SnackbarContext";
import useFavoritesMutate from "queries/listings/useFavoritesMutate";
import { SafeUser } from "types/user";

import useUnFavoritesMutate from "../queries/listings/useUnFavoritesMutate";

interface Props {
  listingId: string;
  user?: SafeUser | null;
}

const useFavorite = ({ listingId, user }: Props) => {
  const router = useRouter();
  const { openModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const favoritesMutate = useFavoritesMutate();
  const unFavoritesMutate = useUnFavoritesMutate();

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteIds ?? [];

    return list.includes(listingId);
  }, [user, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!user) {
        return openModal({
          content: <LoginModal />,
        });
      }

      try {
        if (hasFavorited) {
          await unFavoritesMutate.trigger({ listingId });
          openSnackbar({
            snackbarType: "success",
            text: t("listings.favorite.remove"),
          });
        } else {
          await favoritesMutate.trigger({ listingId });
          openSnackbar({
            snackbarType: "success",
            text: t("listings.favorite.save"),
          });
        }
        router.refresh();
      } catch (error) {
        openSnackbar({
          snackbarType: "error",
          text: t("listings.favorite.error"),
        });
      }
    },
    [t, user, hasFavorited, listingId, openModal, openSnackbar, router],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
