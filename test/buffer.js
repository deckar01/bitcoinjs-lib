var assert = require('assert')
var BufferExt = require('../').BufferExt

var fixtures = require('./fixtures/buffer.js')

describe('Buffer Extensions', function() {
  describe('readUInt64LE', function() {
    it('matches test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var buffer = new Buffer(f.hex64, 'hex')
        var number = BufferExt.readUInt64LE(buffer, 0)

        assert.equal(number, f.dec)
      })
    })
  })

  describe('readVarInt', function() {
    it('matches test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var buffer = new Buffer(f.hexVI, 'hex')
        var d = BufferExt.readVarInt(buffer, 0)

        assert.equal(d.number, f.dec)
        assert.equal(d.size, buffer.length)
      })
    })
  })

  describe('varIntSize', function() {
    it('matches test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var number = parseInt(f.dec)
        var size = BufferExt.varIntSize(number)

        assert.equal(size, f.hexVI.length / 2)
      })
    })
  })

  describe('writeUInt64LE', function() {
    it('matches test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var buffer = new Buffer(8)
        buffer.fill(0)

        BufferExt.writeUInt64LE(buffer, f.dec, 0)
        assert.equal(buffer.toString('hex'), f.hex64)
      })
    })

    fixtures.invalid.forEach(function(f) {
      it('throws on ' + f.description, function() {
        assert.throws(function() {
          var buffer = new Buffer(8)
          buffer.fill(0)

          BufferExt.writeUInt64LE(buffer, f.dec, 0)
        })
      })
    })
  })

  describe('writeVarInt', function() {
    it('matches test vectors', function() {
      fixtures.valid.forEach(function(f) {
        var buffer = new Buffer(9)
        buffer.fill(0)

        var n = BufferExt.writeVarInt(buffer, f.dec, 0)
        assert.equal(buffer.slice(0, n).toString('hex'), f.hexVI)
      })
    })

    fixtures.invalid.forEach(function(f) {
      it('throws on ' + f.description, function() {
        assert.throws(function() {
          var buffer = new Buffer(9)
          buffer.fill(0)

          BufferExt.writeVarInt(buffer, f.dec, 0)
        })
      })
    })
  })
})
