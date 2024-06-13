import React from "react";
import ModifyDialog from "../atoms/custom-ui/dialogs/ModifyDialog";
import DiscardDialog from "../atoms/custom-ui/dialogs/DiscardDialog";
import CustomSnackbar from "../atoms/custom-ui/snackbars/CustomSnackbar";

const FeedbackLayout = ({
  modifyDialogProps,
  discardDialogProps,
  snackProps,
}) => {
  return (
    <>
      <ModifyDialog {...modifyDialogProps} />
      <DiscardDialog {...discardDialogProps} />
      <CustomSnackbar {...snackProps} />
    </>
  );
};

export default FeedbackLayout;
