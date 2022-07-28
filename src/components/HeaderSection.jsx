import React from 'react';


const HeaderSection = ({props}) => {
    return(
        <div className='section__header'>
            <div>
                <h3>{props.text}</h3>
            </div>
            <div>
                {(() => {
                    if ( props.link ) {
                        return(
                            <h1></h1>
                        )
                    }
                })()}
            </div>
        </div>
    )
}

export default (HeaderSection)