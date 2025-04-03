import Book from "../../components/book/Book.component";
import FooterHome from "../../components/footer/home/FooterHome.component";
import NavHome from "../../components/nav/main/NavHome.component";
import "./BookPage.route.css";

const BookPage = () => {
  return (
    <>
    <NavHome/>
    <Book/>
    <FooterHome/>
    </>
  )
}

export default BookPage;
