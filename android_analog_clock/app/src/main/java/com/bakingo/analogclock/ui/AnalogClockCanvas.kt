package com.bakingo.analogclock.ui

import android.graphics.Paint
import android.graphics.Typeface
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.unit.dp
import com.bakingo.analogclock.model.ClockMotionMode
import com.bakingo.analogclock.model.ClockSettings
import com.bakingo.analogclock.model.ClockState
import kotlin.math.cos
import kotlin.math.min
import kotlin.math.sin

@Composable
fun AnalogClockCanvas(
    clockState: ClockState,
    settings: ClockSettings,
    modifier: Modifier = Modifier
) {
    val theme = ClockThemes.getColors(settings.dialStyle)

    // Calculate rotation angles
    val secondAngle: Float
    val minuteAngle: Float
    val hourAngle: Float

    if (settings.motionMode == ClockMotionMode.SWEEPING) {
        val totalSeconds = clockState.seconds + (clockState.milliseconds / 1000f)
        val totalMinutes = clockState.minutes + (totalSeconds / 60f)
        val totalHours = (clockState.hours % 12) + (totalMinutes / 60f)

        secondAngle = totalSeconds * 6.0f
        minuteAngle = totalMinutes * 6.0f
        hourAngle = totalHours * 30.0f
    } else {
        // Discrete mechanical ticking
        val totalMinutes = clockState.minutes + (clockState.seconds / 60f)
        val totalHours = (clockState.hours % 12) + (clockState.minutes / 60f)

        secondAngle = clockState.seconds * 6.0f
        minuteAngle = totalMinutes * 6.0f
        hourAngle = totalHours * 30.0f
    }

    Box(
        modifier = modifier
            .padding(16.dp)
            .aspectRatio(1f)
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val center = Offset(size.width / 2f, size.height / 2f)
            val radius = min(size.width, size.height) / 2f

            // 1. Outer Bezel & Shadow
            drawCircle(
                color = theme.shadowColor,
                radius = radius,
                center = center + Offset(0f, 10f)
            )

            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(theme.outerBezel, theme.innerRing),
                    center = center,
                    radius = radius
                ),
                radius = radius,
                center = center
            )

            drawCircle(
                color = theme.dialBackground,
                radius = radius * 0.92f,
                center = center
            )

            // Subtle inner ring groove
            drawCircle(
                color = theme.innerRing,
                radius = radius * 0.92f,
                center = center,
                style = Stroke(width = 3.dp.toPx())
            )

            // 2. Draw Ticks & Numerals
            drawDialIndices(center, radius, theme)

            // 3. Draw Brand Label / Watermark
            drawBrandWatermark(center, radius, theme)

            // 4. Hour Hand
            drawHourHand(center, radius, hourAngle, theme)

            // 5. Minute Hand
            drawMinuteHand(center, radius, minuteAngle, theme)

            // 6. Second Hand
            drawSecondHand(center, radius, secondAngle, theme)

            // 7. Center Pivot Cap
            drawCenterCap(center, radius, theme)
        }
    }
}

private fun DrawScope.drawDialIndices(center: Offset, radius: Float, theme: DialColors) {
    val textPaint = Paint().apply {
        color = theme.numeralColor.toArgb()
        textSize = radius * 0.13f
        textAlign = Paint.Align.CENTER
        typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)
        isAntiAlias = true
    }

    for (i in 0 until 60) {
        val angleDeg = i * 6.0f
        val angleRad = Math.toRadians(angleDeg.toDouble())
        val isMajor = i % 5 == 0

        val startRadius = if (isMajor) radius * 0.81f else radius * 0.85f
        val endRadius = radius * 0.89f

        val startX = center.x + startRadius * sin(angleRad).toFloat()
        val startY = center.y - startRadius * cos(angleRad).toFloat()
        val endX = center.x + endRadius * sin(angleRad).toFloat()
        val endY = center.y - endRadius * cos(angleRad).toFloat()

        drawLine(
            color = if (isMajor) theme.majorTickColor else theme.minorTickColor,
            start = Offset(startX, startY),
            end = Offset(endX, endY),
            strokeWidth = if (isMajor) 3.5.dp.toPx() else 1.5.dp.toPx(),
            cap = StrokeCap.Round
        )

        // Draw Hour Numbers (12, 1, 2... 11)
        if (isMajor) {
            val hourNumber = if (i / 5 == 0) 12 else i / 5
            val numRadius = radius * 0.68f
            val numX = center.x + numRadius * sin(angleRad).toFloat()
            val numY = center.y - numRadius * cos(angleRad).toFloat() + (textPaint.textSize / 2.7f)

            drawContext.canvas.nativeCanvas.drawText(
                hourNumber.toString(),
                numX,
                numY,
                textPaint
            )
        }
    }
}

private fun DrawScope.drawBrandWatermark(center: Offset, radius: Float, theme: DialColors) {
    val brandPaint = Paint().apply {
        color = theme.numeralColor.copy(alpha = 0.55f).toArgb()
        textSize = radius * 0.065f
        textAlign = Paint.Align.CENTER
        typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)
        letterSpacing = 0.18f
        isAntiAlias = true
    }

    val subPaint = Paint().apply {
        color = theme.secondHandColor.toArgb()
        textSize = radius * 0.042f
        textAlign = Paint.Align.CENTER
        typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)
        letterSpacing = 0.22f
        isAntiAlias = true
    }

    drawContext.canvas.nativeCanvas.drawText("CHRONOMETER", center.x, center.y - radius * 0.32f, brandPaint)
    drawContext.canvas.nativeCanvas.drawText("AUTOMATIC 60FPS", center.x, center.y + radius * 0.36f, subPaint)
}

private fun DrawScope.drawHourHand(center: Offset, radius: Float, angle: Float, theme: DialColors) {
    val handLength = radius * 0.48f
    val baseWidth = radius * 0.045f

    rotate(angle, center) {
        // Shadow
        val shadowPath = Path().apply {
            moveTo(center.x - baseWidth, center.y + baseWidth * 1.5f + 4f)
            lineTo(center.x + baseWidth, center.y + baseWidth * 1.5f + 4f)
            lineTo(center.x + baseWidth * 0.5f, center.y - handLength + 4f)
            lineTo(center.x, center.y - handLength - radius * 0.04f + 4f)
            lineTo(center.x - baseWidth * 0.5f, center.y - handLength + 4f)
            close()
        }
        drawPath(shadowPath, color = theme.shadowColor, style = Fill)

        // Hand Body
        val handPath = Path().apply {
            moveTo(center.x - baseWidth, center.y + baseWidth * 1.5f)
            lineTo(center.x + baseWidth, center.y + baseWidth * 1.5f)
            lineTo(center.x + baseWidth * 0.5f, center.y - handLength)
            lineTo(center.x, center.y - handLength - radius * 0.04f)
            lineTo(center.x - baseWidth * 0.5f, center.y - handLength)
            close()
        }
        drawPath(handPath, color = theme.hourHandColor, style = Fill)
    }
}

private fun DrawScope.drawMinuteHand(center: Offset, radius: Float, angle: Float, theme: DialColors) {
    val handLength = radius * 0.72f
    val baseWidth = radius * 0.035f

    rotate(angle, center) {
        // Shadow
        val shadowPath = Path().apply {
            moveTo(center.x - baseWidth, center.y + baseWidth * 2f + 4f)
            lineTo(center.x + baseWidth, center.y + baseWidth * 2f + 4f)
            lineTo(center.x + baseWidth * 0.4f, center.y - handLength + 4f)
            lineTo(center.x, center.y - handLength - radius * 0.03f + 4f)
            lineTo(center.x - baseWidth * 0.4f, center.y - handLength + 4f)
            close()
        }
        drawPath(shadowPath, color = theme.shadowColor, style = Fill)

        // Hand Body
        val handPath = Path().apply {
            moveTo(center.x - baseWidth, center.y + baseWidth * 2f)
            lineTo(center.x + baseWidth, center.y + baseWidth * 2f)
            lineTo(center.x + baseWidth * 0.4f, center.y - handLength)
            lineTo(center.x, center.y - handLength - radius * 0.03f)
            lineTo(center.x - baseWidth * 0.4f, center.y - handLength)
            close()
        }
        drawPath(handPath, color = theme.minuteHandColor, style = Fill)
    }
}

private fun DrawScope.drawSecondHand(center: Offset, radius: Float, angle: Float, theme: DialColors) {
    val forwardLength = radius * 0.82f
    val counterLength = radius * 0.22f
    val needleWidth = 2.2.dp.toPx()

    rotate(angle, center) {
        // Needle Shadow
        drawLine(
            color = theme.shadowColor,
            start = Offset(center.x, center.y + counterLength + 4f),
            end = Offset(center.x, center.y - forwardLength + 4f),
            strokeWidth = needleWidth,
            cap = StrokeCap.Round
        )

        // Red Needle Hand
        drawLine(
            color = theme.secondHandColor,
            start = Offset(center.x, center.y + counterLength),
            end = Offset(center.x, center.y - forwardLength),
            strokeWidth = needleWidth,
            cap = StrokeCap.Round
        )

        // Counter-balance circle
        drawCircle(
            color = theme.secondHandColor,
            radius = radius * 0.045f,
            center = Offset(center.x, center.y + counterLength * 0.65f),
            style = Stroke(width = 2.dp.toPx())
        )
    }
}

private fun DrawScope.drawCenterCap(center: Offset, radius: Float, theme: DialColors) {
    // Outer Metallic Ring
    drawCircle(
        color = theme.centerCapColor,
        radius = radius * 0.055f,
        center = center
    )

    // Inner Red Accent Dot
    drawCircle(
        color = theme.secondHandColor,
        radius = radius * 0.025f,
        center = center
    )
}
