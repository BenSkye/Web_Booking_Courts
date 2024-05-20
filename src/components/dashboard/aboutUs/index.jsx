import '../aboutUs/aboutus.css'


export default function AboutUs() {
  return (
    <div className="container">
      <h1 className="header">About Us</h1>
      <p className="paragraph">
        <img src="src/assets/logo.png" alt="Sample Image" className="image-left" />
        Courtsite began as a simple solution to a decades-long problem: sports players found it hard to locate and reserve sports facilities, and venue operators needed more efficient ways to streamline booking processes. Our self-service booking and facility automation platform has now made an operational difference for over 200,000 players across more than 1,000 different sports spaces, and counting, who now trust Courtsite for their sports reservations.
      </p>
      <p className="paragraph">
        <img src="src/assets/logo.png" alt="Sample Image" className="image-right" />
        Our team consists of experienced professionals who are passionate about their work.
      </p>
      <p className="paragraph">
        <img src="src/assets/logo.png" alt="Sample Image" className="image-left" />
        We believe in innovation, collaboration, and excellence in everything we do.
      </p>
      <div className="teamSection">
        <h2 className="teamHeader">Meet Our Team</h2>
        <div className="teamList">
          <div className="teamMember">
            <img src="src/assets/khanh.png" alt="John Doe" className="image" />
            <h3 className="teamName">John Doe</h3>
            <p className="teamRole">CEO</p>
          </div>
          <div className="teamMember">
            <img src="src/assets/khanh.png" alt="Khánh" className="image" />
            <h3 className="teamName">Khanhda Jin</h3>
            <p className="teamRole"></p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </div>
    </div>
  );
}