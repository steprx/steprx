import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useUserStore } from "../Stores/UserStore";
import { calcAge, calcHeight } from "../utils/calculations";

const Profile = () => {
  const userAttributes = useUserStore((state) => state.userAttributes);
  const name = userAttributes.given_name + " " + userAttributes.family_name;
  const userInfo = useUserStore((state) => state.userInfo);
  const weighIns = useUserStore((state) => state.weighIns);
  const age = calcAge(Number(userInfo?.birthdate));
  const weight = weighIns?.at(0)?.weight;
  const height = calcHeight(
    weighIns?.at(0)?.heightFt,
    weighIns?.at(0)?.heightIn
  );
  const bodyFat = weighIns?.at(0)?.bodyFat;
  const targetWeightLoss = weighIns?.at(0)?.targetWeightLoss;
  const sex = userInfo?.sex;
  const waist = weighIns?.at(0)?.waist;
  const neck = weighIns?.at(0)?.neck;
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
            <Typography variant="h5">Weight (lbs):</Typography>
            <TextField size="small" disabled defaultValue={weight} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Height (in):</Typography>
            <TextField size="small" disabled defaultValue={height} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Body Fat %:</Typography>
            <TextField size="small" disabled defaultValue={bodyFat} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Target Weight Loss %:</Typography>
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
            <Typography variant="h5">Waist (in):</Typography>
            <TextField size="small" disabled defaultValue={waist} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Neck (in):</Typography>
            <TextField size="small" disabled defaultValue={neck} />
          </Stack>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" my={2}>
        <Button variant="contained">Save Changes</Button>
      </Box>
    </Box>
  );
};

export default Profile;
