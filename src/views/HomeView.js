import Map from "../components/Map";

import { Tab, Tabs, ListGroup } from "react-bootstrap";

const HomeView = () => {
  return (
    <>
      <Map />
      <p id="about"></p>
      <div className="home-content">
        <Tabs defaultActiveKey="About" className="mb-3 tab-section">
          <Tab eventKey="About" title="About PrEP Maps">
            <h3>About PrEP Maps</h3>

            <p>
              PrEP Maps is an interactive map for finding providers in Miami,
              Florida (Miami-Dade County) that can assist in HIV preventative
              healthcare. You can click on blue pill markers to see what kind of
              services each provider offers such as PrEP, PEP, or HIV testing
              and to see whether they require insurance. If you are a provider
              that wants to include their practice in this map, you can register
              and sign up. This website combines all the
              existing resources for HIV prevention in Miami into an accessible
              location for everyone to use.
            </p>
          </Tab>
          <Tab eventKey="PrEP" title="PrEP">
            <h3>What is PrEP?</h3>

            <p>
              Pre-exposure prophylaxis (PrEP) is an HIV prevention medication
              that you take everyday. It provides a high level of protection and
              is even more effective when paired with other protection methods
              such as condoms. In several studies, PrEP has been shown to reduce
              risk by 92% for those that consistently take it. People who take
              PrEP should visit their provider every 3 months for follow-up
              checks and prescription refills. If you believe you are at risk
              for HIV, consider talking with a health care provider for PrEP as
              an option.
            </p>
          </Tab>
          <Tab eventKey="PEP" title="PEP">
            <h3>What is PEP?</h3>

            <p>
              Post-exposure prophylaxis (PEP) is an emergency medication that
              can prevent HIV after you have been exposed to it. It must be
              taken within 72 hours after being exposed to HIV, but the sooner
              you begin the better. HIV is usually contracted through the
              exchange of bodily fluids via sexual intercourse or through
              sharing needles. PEP may help the immune system combat HIV and
              reduce the rate of replication. If you believe you have been
              exposed to HIV in the last 72 hours, you should talk to a health
              care provider or emergency room for PEP.
            </p>
          </Tab>
          <Tab eventKey="HIV Testing" title="HIV Testing">
            <h3>What are HIV tests?</h3>

            <p>
              The only way to know for sure if you have HIV is to get tested.
              Today, there are a variety of testing methods including rapid HIV
              testing where you can recieve results in under a minute. Knowing
              your status is one of the best ways you can protect yourself and
              others. If you are HIV positive, knowing your status also helps
              you find the right care that can help you live a healthy life and
              become undetectable, which is when the viral count of HIV in your
              body is so low that it can no longer be transmitted to others.
            </p>
          </Tab>
        </Tabs>

        <div className="banner-container" id="resources">
          <img
            className="banner-img"
            src="/banner.svg"
            alt="PrEP maps banner"
          />
        </div>

        <Tabs
          defaultActiveKey="Online Resources"
          id="uncontrolled-tab-example"
          className="mb-3 tab-section"
        >
          <Tab eventKey="Online Resources" title="Online Resources">
            <h3>Online Resources</h3>

            <p>
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://www.plannedparenthood.org/learn/stds-hiv-safer-sex/hiv-aids"
                  >
                    Planned Parenthood - HIV, AIDS, and Other Questions About
                    Prevention and Care
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.cdc.gov/stophivtogether/index.html"
                  >
                    Centers for Disease Control and Prevention - Let's Stop HIV
                    Together Campaign
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.cdc.gov/hiv/basics/prep.html"
                  >
                    Centers for Disease Control and Prevention - PrEP
                    (Pre-Exposure Prophylaxis)
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.cdc.gov/hiv/basics/pep.html"
                  >
                    Centers for Disease Control and Prevention - PEP
                    (Post-Exposure Prophylaxis)
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="http://www.floridahealth.gov/diseases-and-conditions/aids/index.html"
                  >
                    Florida Health - HIV/AIDS Information Website
                  </a>
                </li>
              </ul>
            </p>
          </Tab>
          <Tab eventKey="Phone Numbers" title="Phone Numbers">
            <h3>Phone Numbers</h3>

            <p>
              <ul>
                <li>
                  1-800-HIV-0440 - United States Department of HHS HIV Info
                  Number
                </li>
                <li>
                  (850) 245-4422 - Florida Health Disease Control Phone Number
                </li>
                <li>(305) 324-2400 - Florida Health General Phone Number</li>
                <li>(754) 444-2584 - Florida PrEP/PEP Hotline</li>
                <li>(800) 352-AIDS - Florida HIV/AIDS Hotline</li>
              </ul>
            </p>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default HomeView;
