/**
 * Created by cool.blue on 11-Aug-16.
 */
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

it('asynchronously emits finish after logging is complete', function(done){
    const EE = require('events');
    const testEmitter = new EE();

    var cb = sinon.spy(completed);

    process.nextTick(() => testEmitter.emit('finish'));

    testEmitter.on('finish', cb.bind(null));

    process.nextTick(() => testEmitter.emit('finish'));

    function completed() {

        if(cb.callCount < 2)
            return;

        expect(cb).to.have.been.calledTwice;
        expect(cb).to.have.been.calledOn(null);
        expect(cb).to.have.been.calledWithExactly();

        done()
    }

});
