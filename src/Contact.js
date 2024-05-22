import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Contact = () => {

  const { user, isAuthenticated } = useAuth0();
  return (
    <Wrapper>
      <h2 className="common-heading">Contact Page</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.742860408168!2d74.27828747682811!3d31.503751074221643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903a47c983979%3A0x6f008b53487f811d!2sKareem%20Block%20Market!5e0!3m2!1sen!2s!4v1713737751039!5m2!1sen!2s"
        width="100%"
        height="400"
        style={{ border: '0' }}
        allowfullscreen=""
        loading="lazy"
        title="myMap"
        referrerPolicy="no-referrer-when-downgrade" />
      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/mwkgankl" method="POST" className="contact-inputs">
            <input type="text" name="username" id="username" placeholder="username" required autoComplete="off" value={isAuthenticated ? user.name : ""} />
            <input type="email" name="Email" id="Email" placeholder="Email" autoComplete="off" required value={isAuthenticated ? user.email : ""} />
            <textarea name="message" required autoComplete="off" id="message" placeholder="Enter Your Message"></textarea>
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );

};

const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
`;

export default Contact;
