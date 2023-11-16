import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import LoginModal from "components/modal/LoginModal";
import { useModal } from "contexts/ModalContext";
import { useSnackbar } from "contexts/SnackbarContext";
import useFavoritesMutation from "queries/listings/useFavoritesMutation";
import { SafeUser } from "types/user";

import useDeleteFavoritesMutation from "../queries/listings/useDeleteFavoritesMutation";

interface Props {
  listingId: string;
  user?: SafeUser | null;
}

const useFavorite = ({ listingId, user }: Props) => {
  const router = useRouter();
  const { openModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const favoritesMutation = useFavoritesMutation();
  const deleteFavoritesMutation = useDeleteFavoritesMutation();

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
          await deleteFavoritesMutation.trigger({ listingId });
          openSnackbar({
            snackbarType: "success",
            text: t("listings.favorite.remove"),
          });
        } else {
          await favoritesMutation.trigger({ listingId });
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
