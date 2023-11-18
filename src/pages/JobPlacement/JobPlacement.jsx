
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const JobPlacement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

  const jobSectors = ['Web Development', 'Graphic Design'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-4 my-16 mx-auto container lg:w-2/4 w-full p-4">
      <h1 className='my-6 font-serif font-semibold text-2xl'>Job Placement Infomation MBPI </h1>
      <TextField

        label="Name"
        {...register('name', { required: true })}
        fullWidth
        margin="normal"
      />
      {errors.name && <span className="text-red-500">Name is required</span>}

      <TextField
        label="Email"
        type="email"
        {...register('email', { required: true })}
        fullWidth
        margin="normal"
      />
      {errors.email && <span className="text-red-500">Email is required</span>}

      <TextField
        select
        label="Gender"
        {...register('gender', { required: true })}
        fullWidth
        margin="normal"
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>
      {errors.gender && (
        <span className="text-red-500">Gender is required</span>
      )}

      {/* Add other input fields similarly */}
      
      <TextField
        label="Mobile Number"
        type="tel"
        {...register('mobileNumber', { required: true })}
        fullWidth
        margin="normal"
      />
      {errors.mobileNumber && (
        <span className="text-red-500">Mobile Number is required</span>
      )}

      <TextField
        label="Session"
        {...register('session', { required: true })}
        fullWidth
        margin="normal"
      />
      {errors.session && <span className="text-red-500">Session is required</span>}

      {/* Add other input fields similarly */}
      
      <TextField
        label="Location of the Company"
        {...register('companyLocation', { required: true })}
        fullWidth
        margin="normal"
      />
      {errors.companyLocation && (
        <span className="text-red-500">Location of the Company is required</span>
      )}

      <TextField
        label="Designation"
        {...register('designation')}
        fullWidth
        margin="normal"
      />
     

      <TextField
        select
        label="Job Sector"
        {...register('jobSector', { required: true })}
        fullWidth
        margin="normal"
      >
        {jobSectors.map((sector) => (
          <MenuItem key={sector} value={sector}>
            {sector}
          </MenuItem>
        ))}
      </TextField>
      {errors.jobSector && (
        <span className="text-red-500">Job Sector is required</span>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default JobPlacement;
