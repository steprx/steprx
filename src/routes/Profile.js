import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useInfoStore } from "../Stores/InfoStore";
import { useUserStore } from "../Stores/UserStore";

const Profile = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const userAttributes = useUserStore((state) => state.userAttributes);
  const name = userAttributes.given_name + " " + userAttributes.family_name;
  const age = useInfoStore((state) => state.age);
  const weight = useInfoStore((state) => state.weight);
  const height = useInfoStore((state) => state.height);
  const bodyFat = useInfoStore((state) => state.bodyFat);
  const targetWeight = useInfoStore((state) => state.targetWeight);
  const sex = useInfoStore((state) => state.gender);
  const waist = useInfoStore((state) => state.waist);
  const neck = useInfoStore((state) => state.neck);
  return (
    <Box p={2}>
      <Typography variant="h4" align="center">
        My Profile
      </Typography>
      <Grid container spacing={2} my={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Name:</Typography>
            <TextField size="small" disabled defaultValue={name} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Email:</Typography>
            <TextField
              size="small"
              disabled
              defaultValue={userAttributes.email}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Age:</Typography>
            <TextField size="small" disabled defaultValue={age} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Weight:</Typography>
            <TextField size="small" disabled defaultValue={weight} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Height:</Typography>
            <TextField size="small" disabled defaultValue={height} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Body Fat Percentage:</Typography>
            <TextField size="small" disabled defaultValue={bodyFat} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Target Weight:</Typography>
            <TextField size="small" disabled defaultValue={targetWeight} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Sex:</Typography>
            <TextField size="small" disabled defaultValue={sex} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Waist:</Typography>
            <TextField size="small" disabled defaultValue={waist} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Neck:</Typography>
            <TextField size="small" disabled defaultValue={neck} />
          </Stack>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2} my={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Name:</Typography>
            <Typography variant="h5">Test User</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Email:</Typography>
            <Typography variant="h5">jdoubled05@gmail.com</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Age:</Typography>
            <Typography variant="h5">21</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Weight:</Typography>
            <Typography variant="h5">225</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Height:</Typography>
            <Typography variant="h5">6' 4"</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Body Fat Percentage:</Typography>
            <Typography variant="h5">35%</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Target Weight:</Typography>
            <Typography variant="h5">210</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Sex:</Typography>
            <Typography variant="h5">Male</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Waist:</Typography>
            <Typography variant="h5">38</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Neck:</Typography>
            <Typography variant="h5">17</Typography>
          </Stack>
        </Grid>
      </Grid> */}
      <Box display="flex" justifyContent="center" my={2}>
        <Button variant="contained">Save Changes</Button>
        {/* <Button>Edit Profile</Button> */}
      </Box>
    </Box>
  );
};

export default Profile;
