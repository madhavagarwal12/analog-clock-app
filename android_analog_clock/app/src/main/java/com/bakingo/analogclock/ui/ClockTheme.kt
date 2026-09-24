package com.bakingo.analogclock.ui

import androidx.compose.ui.graphics.Color
import com.bakingo.analogclock.model.ClockDialStyle

data class DialColors(
    val dialBackground: Color,
    val outerBezel: Color,
    val innerRing: Color,
    val majorTickColor: Color,
    val minorTickColor: Color,
    val numeralColor: Color,
    val hourHandColor: Color,
    val minuteHandColor: Color,
    val secondHandColor: Color,
    val centerCapColor: Color,
    val shadowColor: Color
)

object ClockThemes {
    val Obsidian = DialColors(
        dialBackground = Color(0xFF14151B),
        outerBezel = Color(0xFF282A33),
        innerRing = Color(0xFF1F2128),
        majorTickColor = Color(0xFFE5E5EA),
        minorTickColor = Color(0xFF50525C),
        numeralColor = Color(0xFFF2F2F7),
        hourHandColor = Color(0xFFECECEE),
        minuteHandColor = Color(0xFFC7C7CC),
        secondHandColor = Color(0xFFD12D2D),
        centerCapColor = Color(0xFFE5E5EA),
        shadowColor = Color(0x66000000)
    )

    val Ivory = DialColors(
        dialBackground = Color(0xFFFBF9F6),
        outerBezel = Color(0xFFD5CFC9),
        innerRing = Color(0xFFE8E2DC),
        majorTickColor = Color(0xFF2C2B2A),
        minorTickColor = Color(0xFFAAA5A0),
        numeralColor = Color(0xFF1F1E1D),
        hourHandColor = Color(0xFF242322),
        minuteHandColor = Color(0xFF4A4846),
        secondHandColor = Color(0xFFAD0D18),
        centerCapColor = Color(0xFFCFA052),
        shadowColor = Color(0x22000000)
    )

    val Minimalist = DialColors(
        dialBackground = Color(0xFF090A0C),
        outerBezel = Color(0xFF1C1E24),
        innerRing = Color(0xFF121418),
        majorTickColor = Color(0xFF00E5FF),
        minorTickColor = Color(0xFF2C3E50),
        numeralColor = Color(0xFFE0F7FA),
        hourHandColor = Color(0xFFFFFFFF),
        minuteHandColor = Color(0xFFB2EBF2),
        secondHandColor = Color(0xFFFF3366),
        centerCapColor = Color(0xFF00E5FF),
        shadowColor = Color(0x88000000)
    )

    fun getColors(style: ClockDialStyle): DialColors {
        return when (style) {
            ClockDialStyle.OBSIDIAN -> Obsidian
            ClockDialStyle.IVORY -> Ivory
            ClockDialStyle.MINIMALIST -> Minimalist
        }
    }
}
