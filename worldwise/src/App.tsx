// npm install react-router-dom@6

import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom"
import Homepage  from "./pages/Homepage"
import Pagenotfound  from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Pricing from "./pages/Pricing"
import Product from "./pages/Product"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"


export interface position{
  "lat":number;
  "lng":number;
}

export interface city{

    "cityName": string;
    "country": string;
    "emoji": string;
    "date": string;
    "notes": string;
    "position": position;
    "id": number;
  }

function App() {
  
  
   return (
    <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>} />
        <Route path="product" element={<Product/>}> </Route>
        <Route path="pricing" element={<Pricing/>}> </Route>
        <Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
          <Route index element={<Navigate replace to="cities"/>}></Route>
          <Route path="cities" element={<CityList />}></Route>
          <Route path='cities/:id' element={<City />}></Route>
         
          <Route path="countries" element={<CountryList />}></Route>
          <Route path="form" element={<Form/>}></Route>
        </Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="*" element={<Pagenotfound/>}></Route>
      </Routes>
    </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
   )
}

export default App
