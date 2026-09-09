import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* HERO */}
      <section className="bg-white px-6 py-20 text-center border-b">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Welcome to our bookstore
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Next
            <span className="text-blue-600"> Great Read</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-500 leading-8">
            Books have the power to inspire, educate, entertain, and change the
            way we see the world. We make discovering your next favorite book
            simple and enjoyable.
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-blue-600 text-white px-7 py-3 rounded-lg
            font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Explore Books
          </Link>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
              Our Story
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              A Simple Idea Behind Every Page
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              Our platform was created with a simple goal: to make books
              accessible to everyone. We wanted to create a place where readers
              could easily explore different books and find something they truly
              enjoy.
            </p>

            <p className="text-gray-600 leading-8">
              From novels and educational books to technology, history, and many
              other categories, our bookstore is designed to make discovering
              books easier and more enjoyable.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border p-10">
            <div className="text-7xl text-center mb-6">📚</div>

            <h3 className="text-2xl font-bold text-center mb-4">
              Every Book Has a Story
            </h3>

            <p className="text-gray-500 text-center leading-7">
              And every reader has a different journey. We are here to help you
              find the books that become part of yours.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold mb-2">100+</p>
            <p className="text-gray-400">Books Available</p>
          </div>

          <div>
            <p className="text-4xl font-bold mb-2">50+</p>
            <p className="text-gray-400">Authors</p>
          </div>

          <div>
            <p className="text-4xl font-bold mb-2">24/7</p>
            <p className="text-gray-400">Online Access</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Why Us
          </p>

          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Our Bookstore?
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Everything is designed to make your book-shopping experience simple,
            convenient, and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* CARD 1 */}
          <div
            className="bg-white border rounded-2xl p-8 text-center shadow-sm
            hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <div className="text-5xl mb-5">📚</div>

            <h3 className="text-xl font-bold mb-3">Great Collection</h3>

            <p className="text-gray-500 leading-7">
              Explore a growing collection of books from different categories,
              subjects, and authors.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className="bg-white border rounded-2xl p-8 text-center shadow-sm
            hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <div className="text-5xl mb-5">🛒</div>

            <h3 className="text-xl font-bold mb-3">Easy Shopping</h3>

            <p className="text-gray-500 leading-7">
              Browse books, choose quantities, and manage your shopping cart
              quickly and easily.
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className="bg-white border rounded-2xl p-8 text-center shadow-sm
            hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <div className="text-5xl mb-5">❤️</div>

            <h3 className="text-xl font-bold mb-3">Made for Readers</h3>

            <p className="text-gray-500 leading-7">
              A simple and comfortable platform created with readers and their
              experience in mind.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-blue-50 border-y px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Our Mission
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Connecting Readers With Stories
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            Our mission is to connect readers with books they love and create a
            simple, reliable, and enjoyable online shopping experience. Whether
            you're learning something new or escaping into a story, we want to
            help you find your next great read.
          </p>
        </div>
      </section>

      {/* CTA */}
    </div>
  );
}

export default About;
