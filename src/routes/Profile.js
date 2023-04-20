import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useInfoStore } from "../Stores/InfoStore";
import { useUserStore } from "../Stores/UserStore";
import { calcAge, calcHeight } from "../utils/calculations";

const Profile = () => {
  const userAttributes = useUserStore((state) => state.userAttributes);
  const name = userAttributes.given_name + " " + userAttributes.family_name;
  const userInfo = useUserStore((state) => state.userInfo);
  const age = calcAge(userInfo?.at(0)?.birthdate.N);
  const weight = userInfo?.at(0)?.weight.S;
  const height = calcHeight(
    userInfo?.at(0)?.heightFt.S,
    userInfo?.at(0)?.heightIn.S
  );
  const bodyFat = userInfo?.at(0)?.bodyFat.S;
  const targetWeightLoss = userInfo?.at(0)?.targetWeightLoss.S;
  const sex = userInfo?.at(0)?.sex.S;
  const waist = userInfo?.at(0)?.waist.S;
  const neck = userInfo?.at(0)?.neck.S;
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
            <TextField size="small" disabled defaultValue={targetWeightLoss} />
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
      <Box display="flex" justifyContent="center" my={2}>
        <Button variant="contained">Save Changes</Button>
        {/* <Button>Edit Profile</Button> */}
      </Box>
    </Box>
  );
};

export default Profile;
