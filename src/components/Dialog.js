import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function CustomDialog({open, handleClose, data}) {
    return (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {data.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {data.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => handleClose(null)} >Cancel</Button>
            <Button variant="contained" onClick={() => handleClose(data.id)} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
    );
  }