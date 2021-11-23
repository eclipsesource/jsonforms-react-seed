import * as React from 'react';

// TODO: typings
export class Tier extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            tier_name: props.tier,
            tier_price: props.price
        };
    }

    static getDerivedStateFromProps = (nextProps: any, prevState: any) => {
        if (prevState.tier_price !== nextProps.price) {
            return {
                tier_price: nextProps.price
            };
        }
        return null;
    };

    render() {
        return (
            <div>
                ${this.props.tier} test <span key={`${this.props.id}`}>${this.props.price}</span>
            </div>
        );
    }
}