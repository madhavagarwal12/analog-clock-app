package com.bakingo.analogclock.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bakingo.analogclock.audio.TickSoundEngine
import com.bakingo.analogclock.model.ClockDialStyle
import com.bakingo.analogclock.model.ClockMotionMode
import com.bakingo.analogclock.model.ClockSettings
import com.bakingo.analogclock.model.ClockState
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale
import java.util.TimeZone

class ClockViewModel : ViewModel() {

    private val soundEngine = TickSoundEngine()

    private val _clockState = MutableStateFlow(ClockState())
    val clockState: StateFlow<ClockState> = _clockState.asStateFlow()

    private val _settings = MutableStateFlow(ClockSettings())
    val settings: StateFlow<ClockSettings> = _settings.asStateFlow()

    private val dateFormat = SimpleDateFormat("EEEE, d MMMM yyyy", Locale.getDefault())
    private var lastTickedSecond = -1

    init {
        startClockLoop()
    }

    private fun startClockLoop() {
        viewModelScope.launch(Dispatchers.Default) {
            while (isActive) {
                val calendar = Calendar.getInstance()
                val now = Date()
                val hours = calendar.get(Calendar.HOUR)
                val minutes = calendar.get(Calendar.MINUTE)
                val seconds = calendar.get(Calendar.SECOND)
                val millis = calendar.get(Calendar.MILLISECOND)
                val tz = TimeZone.getDefault().getDisplayName(false, TimeZone.SHORT)

                _clockState.update {
                    ClockState(
                        hours = hours,
                        minutes = minutes,
                        seconds = seconds,
                        milliseconds = millis,
                        formattedDate = dateFormat.format(now),
                        timezone = tz
                    )
                }

                // Audio Tick Trigger on second transitions
                if (seconds != lastTickedSecond) {
                    lastTickedSecond = seconds
                    if (_settings.value.isSoundEnabled) {
                        soundEngine.playTick(isEvenSecond = seconds % 2 == 0)
                    }
                }

                // Smooth refresh rate (~60fps = 16ms)
                delay(16L)
            }
        }
    }

    fun setMotionMode(mode: ClockMotionMode) {
        _settings.update { it.copy(motionMode = mode) }
    }

    fun toggleSound() {
        _settings.update { it.copy(isSoundEnabled = !it.isSoundEnabled) }
    }

    fun setDialStyle(style: ClockDialStyle) {
        _settings.update { it.copy(dialStyle = style) }
    }

    override fun onCleared() {
        super.onCleared()
        soundEngine.release()
    }
}
