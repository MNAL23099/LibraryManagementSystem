import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from './Homepage/Homepage'
import SignUp from './SignUp/signUp';
import SignIn from './SignIn/SignIn';
import Website_Admin_Dashboard from './Website_Admin/Website_Admin_Dashboard';
import Website_Admin_View_Accounts from './Website_Admin/Website_Admin_View_Accounts';
import Website_Admin_Add_Account from './Website_Admin/Website_Admin_Add_Account';
import Inventory_Dashboard from './Inventory/Inventory_Dashboard';
import AddBook from './Library/AddBooks.jsx';
import EditBook from './Library/EditBooks.jsx';
import Library_Dashboard from './Library/Library_Dashboard.jsx';
import Customer_Dashboard from './Customer/Customer_Dashboard.jsx';
import Customer_ViewBooks from './Customer/ViewBooks/ViewBooks.jsx';
import Customer_ViewBorrowedBooks from './Customer/ViewBorrowedBooks/ViewBorrowedBooks.jsx';
import ViewBorrows from './Library/ViewBorrows.jsx';
import Staff_ViewBooks from './Library/ViewBook.jsx';
function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path= "/signin" element = {<SignIn />} />
        <Route path= "/website_admin_dashboard" element = {<Website_Admin_Dashboard />} />
        <Route path= "/website_admin_dashboard/viewAccounts" element = {<Website_Admin_View_Accounts />} />
        <Route path= "/website_admin_dashboard/addAccount" element = {<Website_Admin_Add_Account />} />
        <Route path= "/inventory_dashboard" element = {<Inventory_Dashboard />} />
        <Route path= "library/addBook" element = {<AddBook/>}/>
        <Route path="library/editBook" element = {<EditBook/>}/>
        <Route path="library_Dashboard" element = {<Library_Dashboard/>}/>
        <Route path="customer_dashboard" element = {<Customer_Dashboard/>}/>
        <Route path="customer_dashboard/viewBooks" element = {<Customer_ViewBooks/>}/>
        <Route path="customer_dashboard/viewBorrowedBooks" element = {<Customer_ViewBorrowedBooks/>}/>
        <Route path="library_Dashboard/viewBorrows" element = {<ViewBorrows/>}/>
        <Route path="library/viewBook" element = {<Staff_ViewBooks/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App