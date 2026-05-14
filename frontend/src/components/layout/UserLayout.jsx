import Sidebar from './Sidebar';

const UserLayout = ({ children }) => {
  const menuItems = [
    { name: 'Profile', url: '/me/profile', icon: 'fas fa-user' },
    {
      name: 'Update Profile',
      url: '/me/update_profile',
      icon: 'fas fa-user',
    },
    {
      name: 'Upload Avatar',
      url: '/me/upload_avatar',
      icon: 'fas fa-user-circle',
    },
    {
      name: 'Update Password',
      url: '/me/update_password',
      icon: 'fas fa-lock',
    },
  ];
  return (
    <div>
      <div className='mt-2 mb-4 py-4'>
        <div className='text-center fs-3 fw-bolder'>User Settings</div>
      </div>

      <div className='container'>
        <div className='row justify-content-around'>
          <div className='col-12 col-lg-3'>
            <Sidebar menuItems={menuItems} />
          </div>
          <div className='col-12 col-lg-8 user-dashboard'>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
