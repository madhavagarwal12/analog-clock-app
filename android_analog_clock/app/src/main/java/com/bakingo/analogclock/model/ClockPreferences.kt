package com.bakingo.analogclock.model

enum class ClockMotionMode(val title: String) {
    SWEEPING("Smooth Sweeping"),
    TICKING("Mechanical Ticking")
}

enum class ClockDialStyle(val title: String) {
    OBSIDIAN("Obsidian Black"),
    IVORY("Artisanal Ivory"),
    MINIMALIST("Minimalist Chrome")
}

data class ClockState(
    val hours: Int = 0,
    val minutes: Int = 0,
    val seconds: Int = 0,
    val milliseconds: Int = 0,
    val formattedDate: String = "",
    val timezone: String = "IST"
)

data class ClockSettings(
    val motionMode: ClockMotionMode = ClockMotionMode.SWEEPING,
    val isSoundEnabled: Boolean = false,
    val dialStyle: ClockDialStyle = ClockDialStyle.OBSIDIAN
)
