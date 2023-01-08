import './App.css';
import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home, NotFound404, CreateAccount, CreateFood, WorkoutsPage, BecomeAClient, UserTrainers, WatchTrainerVideo, TrainersDetails, LogIn, Profile, FoodView, FoodAnalysis, Preview, Messages, Matches, Search } from './components';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/matches" element={<Home />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/messages" element={<Messages />} />
      {
        /*
         THIS IS NO LONGER NEEDED BEING THAT WE ARE NOT SUBSCRIPTION BASE FOR NOW... LEGACY CODE
         <Route path="/changeSubscription" element={<ChangeSubscription />} />
         <Route path="/changeSubscription/:token" element={<ChangeSubscriptionWithToken />} />
         */
      }
      <Route path="/matches/:id" element={<Matches />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="/food" element={<FoodView />}/>
      <Route path="/foodAnalysis" element={<FoodAnalysis />}/>
      <Route path="/createFood" element={<CreateFood />} />
      <Route path="/" element={<WorkoutsPage />} />
      <Route path="/trainer/:id" element={<TrainersDetails />} />
      <Route path="/trainers" element={<UserTrainers />} />
      <Route path="/trainers/:id/client" element={<BecomeAClient />} />
      <Route path="/videos/:id" element={<WatchTrainerVideo />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
