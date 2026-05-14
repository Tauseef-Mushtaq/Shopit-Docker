import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ menuItems }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  return (
    <div class='list-group mt-5 pl-4'>
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.url}
          class={`fw-bold list-group-item list-group-item-action ${
            activeItem.includes(item.url) ? 'active' : ''
          }`}
          aria-current={activeItem.includes(item.url) ? 'true' : 'false '}
          onClick={() => setActiveItem(item.url)}
        >
          <i class={`${item.icon} fa-fw pe-2`}></i> {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
