import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { IUserResponse, TActivityCreate, TActivityResponse, TEventContactsResponse, TParticipationData } from '../../types';
import ContactCard from '../contact_card/ContactCard';
import { useStyles } from './ActivityFormStyle';
import { ActivityParticipantsTable } from '../activity_participants/ActivityParticipantsTable';
import { toast } from 'sonner';
import { calculateTotalPercentages, calculateTotalStaticValues } from '../../utils/calculeValues';
import { createActivity } from '../../services/activity/ActivityService';

type ActivityFormProps = {
  setOpenModalActivity: (value: React.SetStateAction<boolean>) => void;
  eventContacts: TEventContactsResponse[];
  eventId: string;
  handleAddActivity: (activity: TActivityResponse) => void;
  user: IUserResponse;
}

export const ActivityForm:React.FC<ActivityFormProps> = ({
  setOpenModalActivity,
  eventContacts,
  eventId,
  handleAddActivity,
  user,
}) => {

  // #region Estados
  const [selectedContacts, setSelectedContacts] = useState<TEventContactsResponse[]>([]);
  const [isValueFilled, setIsValueFilled] = useState(false);

  const [activityForm, setActivityForm] = useState<TActivityCreate>({
    description: '',
    eventId: eventId,
    value: 0,
    participationData: null
  });
  // #endregion
  
  // #region useEffects

  useEffect(() => {
    const owner : TEventContactsResponse = {
      contactEmail: user.email,
      contactName: user.name,
      contactId: parseInt(user.id),
      contactProfileImage: user.profileImage,
      event_contact_id: 100,
      contactLastName: user.lastName,
      contactUsername: user.username,
      balance: user.balance,
    }  
    selectedContacts.push(owner);
  }, []);

  /**
   * useEffect para iniciar el form repartiendo equitativamente los porcentajes dependiendo de
    los participantes de la actividad
   */
  useEffect(() => {
    const initializeForm = () => {
      const initialValue = activityForm.value;

      const initialParticipationData: TParticipationData = {};

      if (selectedContacts.length > 0) {
        const equalPercentage = 100 / selectedContacts.length;

        selectedContacts.forEach((contact) => {
          const equalStaticValue = (equalPercentage / 100) * initialValue;
          initialParticipationData[contact.contactId] = {
            participationPercentage: parseFloat(equalPercentage.toFixed(2)),
            staticValue: parseFloat(equalStaticValue.toFixed(2)),
          };
        });
      }

      return {
        description: activityForm.description,
        eventId: activityForm.eventId,
        value: initialValue,
        participationData: initialParticipationData,
      };
    };
    setActivityForm(initializeForm());
  }, [selectedContacts, activityForm.value]);

  /**
   * useEffect para determinar si el valor de la actividad está diligenciado
    usamos isValueFilled para dejar o no agregar participantes (tienen que asignar primero el valor
    para que funcione)
   */
  useEffect(() => {
    if (!isNaN(activityForm.value) && activityForm.value > 0) {
      setIsValueFilled(true);
    } else {
      setIsValueFilled(false);
    }
  }, [activityForm, isValueFilled])


  // #endregion

  // #region handleParticipantsSelection, handleParticipation, handleSubmit
  const handleToggleSelection = (eventContact: TEventContactsResponse) => {
    const isSelected = selectedContacts.some((contact) => contact.contactId === eventContact.contactId);

    setSelectedContacts((prevSelectedContacts) =>
    isSelected
      ? prevSelectedContacts.filter((contact) => contact.contactId !== eventContact.contactId)
      : [
          ...prevSelectedContacts,
          {
            ...eventContact,
            description: activityForm.description,
          },
        ]
  );
  };
  
  const handleParticipationChange = (key: string, property: string, value: number) => {
    setActivityForm((prevForm) => {
      const updatedParticipationData = prevForm.participationData ? { ...prevForm.participationData } : {};

      const parsedValue = parseFloat(value.toString());
      const sanitizedValue = isNaN(parsedValue) ? 0 : parsedValue;
      const roundedValue = parseFloat(sanitizedValue.toFixed(2));
      
      if (property === 'participationPercentage') {
        const staticValue = (roundedValue / 100) * prevForm.value;

        updatedParticipationData[key] = {
          ...(updatedParticipationData[key] || {}),
          participationPercentage: roundedValue,
          staticValue: staticValue,
        };
      }  else if (property === 'staticValue') {
        const participationPercentage = (roundedValue / prevForm.value) * 100;

        updatedParticipationData[key] = {
          ...(updatedParticipationData[key] || {}),
          participationPercentage: participationPercentage,
          staticValue: roundedValue,
        };
      }

      const sumPercentValues = calculateTotalPercentages(updatedParticipationData);
      const sumStaticValues = calculateTotalStaticValues(updatedParticipationData);

      if (
        (property === 'participationPercentage' && sumPercentValues > 100) ||
        (property === 'staticValue' && sumStaticValues > prevForm.value)
      ) {
        toast.error('La asignación excede el límite del valor de la actividad')
        console.error('La asignación excede el límite.');
        return prevForm;
      }

      return {
        ...prevForm,
        participationData: updatedParticipationData,
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      const activity:TActivityResponse = await createActivity(activityForm);
        handleAddActivity(activity);
        toast.success('Actividad creada con éxito')
        setOpenModalActivity(false);
    } catch (e) {
      toast.error('Error creando la actividad');
      console.error('Error creando la actividad');
    } 
  };
  // #endregion

  return (
    <Card sx={useStyles.principalCard}>
      <Grid container sx={useStyles.container}>
        <Typography>
          Crear actividad
        </Typography>

        <Grid item xs={12} sm={12} md={12}>
          <form onSubmit={handleFormSubmit}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={activityForm.description}
                  onChange={(e) => 
                    setActivityForm((prevForm) => ({
                      ...prevForm,
                      description: e.target.value
                    }))}
                />
                <TextField
                  label="Valor"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={activityForm.value}
                  onChange={(e) => {
                    setActivityForm((prevForm) => ({
                      ...prevForm,
                      value: parseInt(e.target.value)
                    }))
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ overflowX: 'auto'}}>
                <Typography>
                  Contactos del evento
                </Typography>
                <Grid container spacing={2} sx={{ width: 'unset', flexWrap: 'nowrap' }}>
                  {eventContacts
                    .map((eventContact) => (
                    <Grid item sx={useStyles.cardMapping} xs={4} sm={3} md={2} key={eventContact.contactId}>
                        <ContactCard
                          eventContact={eventContact}
                          onAddClick={handleToggleSelection}
                          isSelected={selectedContacts.some((contact) => contact.contactId === eventContact.contactId)}
                          isEnabled={isValueFilled}
                        />
                    </Grid>
                    ))}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <ActivityParticipantsTable
                  participants={selectedContacts}
                  handleParticipationChange={handleParticipationChange}
                  activityForm={activityForm}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Button type="submit" variant="contained" color="primary" sx={{margin: 2}}>
                  Crear Actividad
                </Button>
                <Button variant="contained" onClick={() => setOpenModalActivity(false)}>
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Card>
  )
}
