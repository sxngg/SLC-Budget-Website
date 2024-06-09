import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Contacts, EventDetails, EventForm, Home, Login, MyEvents, Notifications, Profile, Register, ResponsiveDrawer } from './screens';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute redirectPath='/login'/>}>
            <Route path="/" element={<ResponsiveDrawer />}>
              <Route path='/home' element={<Home />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/my-events' element={<MyEvents />} />
              <Route path='/create-event' element={<EventForm />} />
              <Route path="/event-details/:isOwner" element={<EventDetails />} />
            </Route>
          </Route>

      </Routes>
    </Router>
  );
}

export default App;