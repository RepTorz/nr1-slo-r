/**
 * Provides the inital react context for assembling the complete list of ORG SLOs.
 *
 * @file
 * @author Gil Rice
 */
/** core */
import React from 'react';

/** nr1 */
import {
  PlatformStateContext,
  NerdletStateContext,
  EntitiesByDomainTypeQuery,
  Spinner
} from 'nr1';

/** local */
import SLOREstate from './components/slo-r-estate';

export default class SloRMain extends React.Component {
  static propTypes = {
    // propTypes
  };

  constructor(props) {
    super(props);
  } // constructor

  render() {
    return (
      <div>
        <EntitiesByDomainTypeQuery entityDomain="APM" entityType="APPLICATION">
          {({ loading, error, data, fetchMore }) => {
            if (loading) {
              return <Spinner />;
            }
            if (error) {
              return 'Error!';
            }
            return (
              <PlatformStateContext.Consumer>
                {launcherUrlState => (
                  <NerdletStateContext.Consumer>
                    {nerdletUrlState => (
                      <SLOREstate
                        entities={data.entities}
                        fetchMore={fetchMore}
                        launcherUrlState={launcherUrlState}
                        nerdletUrlState={nerdletUrlState}
                      />
                    )}
                  </NerdletStateContext.Consumer>
                )}
              </PlatformStateContext.Consumer>
            );
          }}
        </EntitiesByDomainTypeQuery>
      </div>
    );
  } // render
} // SloRMain
