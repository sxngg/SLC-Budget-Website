import React from 'react';
import { TEventContactsResponse } from '../../types';
import { Avatar, Card, CardHeader, Grid, Typography } from '@mui/material';
import { useStyles } from './ContactCardStyle';
import { Toaster, toast } from 'sonner';
import CONSTANTS from '../../constants';

interface ContactCardProps {
  eventContact: TEventContactsResponse;
  onAddClick: (contact: TEventContactsResponse) => void;
  isSelected: boolean;
  isEnabled: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  eventContact,
  onAddClick,
  isSelected,
  isEnabled,
}) => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
          ...useStyles.principalCard,
          ...(isSelected && useStyles.selectedCard),
          cursor: isEnabled ? 'pointer' : 'not-allowed',
          }}
          onClick={() => {
            if (isEnabled) {
              onAddClick(eventContact)
            } else {
              toast.error('Debes asignar un valor a la actividad primero');
            }
          }}  
        >
          <CardHeader
            avatar={
              <Avatar 
              src={eventContact.contactProfileImage
                ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${eventContact.contactProfileImage}`
                : ''}
              />
            }
            sx={useStyles.contactCard}
            title={
              <Typography variant="body1" sx={{ fontSize: '0.8rem', textAlign: 'center' }}>
                {eventContact.contactName}
              </Typography>
            }
            subheader={
              <Typography variant="body2" sx={{ fontSize: '0.8rem', textAlign: 'center' }}>
                @{eventContact.contactUsername}
              </Typography>
            }
          />
        </Card> 
        <Toaster />  
      </Grid>
    </Grid>
  );
};

export default ContactCard;
