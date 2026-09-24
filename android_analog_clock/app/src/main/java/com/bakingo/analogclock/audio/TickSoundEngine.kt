package com.bakingo.analogclock.audio

import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioTrack
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlin.math.exp
import kotlin.math.sin

/**
 * Low-Latency PCM Synthesizer for Mechanical Clock Escapement Clicks
 */
class TickSoundEngine {

    private val sampleRate = 44100
    private var tickAudioTrack: AudioTrack? = null
    private var tockAudioTrack: AudioTrack? = null
    private val scope = CoroutineScope(Dispatchers.Default)

    init {
        initTracks()
    }

    private fun initTracks() {
        val tickData = generateClickPulse(frequency = 2400f, durationMs = 18f, decay = 280f)
        val tockData = generateClickPulse(frequency = 1800f, durationMs = 22f, decay = 220f)

        tickAudioTrack = createTrack(tickData)
        tockAudioTrack = createTrack(tockData)
    }

    private fun createTrack(pcmData: ShortArray): AudioTrack {
        val bufferSize = pcmData.size * 2
        val track = AudioTrack.Builder()
            .setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_ASSISTANCE_SONIFICATION)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .build()
            )
            .setAudioFormat(
                AudioFormat.Builder()
                    .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                    .setSampleRate(sampleRate)
                    .setChannelMask(AudioFormat.CHANNEL_OUT_MONO)
                    .build()
            )
            .setBufferSizeInBytes(bufferSize)
            .setTransferMode(AudioTrack.MODE_STATIC)
            .build()

        track.write(pcmData, 0, pcmData.size)
        return track
    }

    /**
     * Synthesize an acoustic mechanical escapement impulse
     */
    private fun generateClickPulse(frequency: Float, durationMs: Float, decay: Float): ShortArray {
        val numSamples = (sampleRate * (durationMs / 1000f)).toInt()
        val buffer = ShortArray(numSamples)

        for (i in 0 until numSamples) {
            val t = i.toFloat() / sampleRate
            // Damped sine wave mimicking metallic escapement pallet hitting gear tooth
            val envelope = exp(-decay * t)
            val wave = sin(2.0 * Math.PI * frequency * t)
            val sample = (wave * envelope * Short.MAX_VALUE * 0.4f).toInt()
            buffer[i] = sample.coerceIn(Short.MIN_VALUE.toInt(), Short.MAX_VALUE.toInt()).toShort()
        }
        return buffer
    }

    fun playTick(isEvenSecond: Boolean) {
        scope.launch {
            try {
                val track = if (isEvenSecond) tickAudioTrack else tockAudioTrack
                track?.let {
                    it.stop()
                    it.reloadStaticData()
                    it.play()
                }
            } catch (e: Exception) {
                // Ignore transient audio issues
            }
        }
    }

    fun release() {
        try {
            tickAudioTrack?.release()
            tockAudioTrack?.release()
            tickAudioTrack = null
            tockAudioTrack = null
        } catch (e: Exception) {}
    }
}
