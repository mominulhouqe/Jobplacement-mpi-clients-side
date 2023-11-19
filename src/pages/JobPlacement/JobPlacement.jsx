
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import axios from "axios";
import Swal from 'sweetalert2';


const JobPlacement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data, e) => {

    try {
      const newFormData = {

        name: data.name,
        email: data.email,
        gender: data.gender,
        mobileNumber: data.mobileNumber,
        session: data.session,
        roll: data.roll,
        compnayName: data.companyName,
        companyLocation: data.companyLocation,
        designation: data.designation,
        jobSector: data.jobSector,
        photoURL: user?.photoURL,
        userName: user?.displayName,
        loginEmail: user?.email,
        timestamp: new Date().toISOString(),
        userId: user?.uid,
      };


      const apiResponse = await axios.post(
        'https://blogs-server-seven.vercel.app/api/forms',
        newFormData
      );

      console.log('Submit successfully:', apiResponse.data);
      // Use SweetAlert for success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Submitted successfully!',
      });
      e.target.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting the form. Please try again.',
      });
      console.error('Error submitting form:', error);
    }
  };

  const jobSectors = ['Web Development', 'Graphic Design', 'Digital Marketing', 'Networking', 'Software Engineer', 'Electionics', 'RAC', 'Food'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-4  my-16 mx-auto container lg:w-2/4 w-full p-4">
      <h1 className='my-2 font-serif font-semibold text-3xl'>Job Placement Infomation MBPI </h1>
      <div className='lg:flex lg:gap-1'>
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
      </div>

      <div className='lg:flex lg:gap-1'>
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
      </div>

      <div className='lg:flex lg:gap-1'>

        <TextField
          label="Session"
          {...register('session', { required: true })}
          fullWidth
          margin="normal"
        />
        {errors.session && <span className="text-red-500">Session is required</span>}

        <TextField
          label="Roll"
          {...register('roll', { required: true })}
          fullWidth
          margin="normal"
        />
        {errors.Roll && <span className="text-red-500">Roll is required</span>}
      </div>
      <TextField
        label="companyName"
        {...register('companyName', { required: true })}
        fullWidth
        margin="normal"
      />
      {errors.companyName && <span className="text-red-500">Company Name is required</span>}

      <TextField
        label="Location of the Company"
        {...register('companyLocation', { required: true })}
        fullWidth
        margin="normal"
      />
      {errors.companyLocation && (
        <span className="text-red-500">Location of the Company is required</span>
      )}

      <div className='lg:flex lg:gap-1'>
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
      </div>

      <button
        type="submit"
        className={`px-6 py-3 mt-4 rounded-md ${!user
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
          } transition-all duration-300`}
        disabled={!user}
      >
        {user ? 'Submit' : 'Please log in to submit'}
      </button>
    </form>
  );
};

export default JobPlacement;
