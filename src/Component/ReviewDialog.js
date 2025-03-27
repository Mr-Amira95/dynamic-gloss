import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Container, Rating } from '@mui/material';

export default function ReviewDialog({open,setOpen,data}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='xl'
        sx={{'.MuiPaper-root':{bgcolor:'transparent'}}}
      >
        <DialogContent>
        <div className="card-containerrr">
                <img src={data.profile_photo_url} alt="user" style={{ borderRadius: '100%', width: '120px', height: '120px' }} referrerPolicy="no-referrer" /><br />
                <Rating name="read-only" value={data.rating} readOnly sx={{ marginTop: '30px' }} />
                <Container maxWidth="sm">
                  <p>{data.text}</p>
                </Container>
                <Container sx={{ position: 'absolute', bottom: '10px', left: '0px', fontWeight: 'bold' }}>
                  <p>{data.author_name}</p>
                </Container>
              </div>
        </DialogContent>
      </Dialog>
  );
}
