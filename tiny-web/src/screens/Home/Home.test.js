import { render, screen } from '@testing-library/react';
import { MockedProvider, mocks } from '@apollo/client/testing';
import { gql, useMutation } from '@apollo/client';
import Home from './Home';

describe('<Home /> spec', () => {

    it('renders the component', () => {
      const container = render(  <MockedProvider>
        <Home  />
      </MockedProvider>);

      expect(container.firstChild).toMatchSnapshot()
    })

    it('ensure Home Component render and be in right status', () => {

        render(  <MockedProvider>
         <Home  />
        </MockedProvider>);
        
      expect(screen.getByText(/Shorten you url!/i)).toBeInTheDocument();
      const element = screen.getByTestId('long-url')
      

      expect(screen.getByLabelText('Your URL')).toHaveDisplayValue('');
    })

    it('ensure When the context contain the link object it should show up on screen', () => {

        const longUrl = "https://stackoverflow.com/questions/61583375/how-can-i-use-count-and-group-by-in-prisma-2";
        const hash = "1335675931";

        const mocks = [
            {
              request: {
                query: gql`
                    mutation CreateLink(
                    $longUrl: String!
                    ) {
                    createLink(longUrl: $longUrl ) {
                        hash
                        longUrl
                    }
                    }
                `,
                variables: { longUrl: longUrl }
              },
              result: { data: {
              createLink: {
               longUrl: longUrl,
                hash:  hash
                }
              }
            }
          }
        ]
        
        render(  <MockedProvider mocks={mocks} >
         <Home   />
        </MockedProvider>);
        
    //   expect(screen.getByText(hash)).toBeInTheDocument();
      const element = screen.getByTestId('long-url')
      expect(screen.getByLabelText('Your URL')).toHaveDisplayValue('');
    })


});