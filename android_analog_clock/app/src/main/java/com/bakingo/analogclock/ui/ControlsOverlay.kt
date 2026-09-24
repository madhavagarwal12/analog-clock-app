package com.bakingo.analogclock.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.VolumeOff
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material.icons.filled.WatchLater
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bakingo.analogclock.model.ClockDialStyle
import com.bakingo.analogclock.model.ClockMotionMode
import com.bakingo.analogclock.model.ClockSettings
import com.bakingo.analogclock.model.ClockState

@Composable
fun ControlsOverlay(
    clockState: ClockState,
    settings: ClockSettings,
    onMotionModeChange: (ClockMotionMode) -> Unit,
    onSoundToggle: () -> Unit,
    onDialStyleChange: (ClockDialStyle) -> Unit,
    modifier: Modifier = Modifier
) {
    val digitalHour = if (clockState.hours == 0) 12 else clockState.hours
    val digitalAmPm = if (clockState.hours >= 12) "PM" else "AM"
    val digitalTimeStr = String.format(
        "%02d:%02d:%02d %s",
        digitalHour,
        clockState.minutes,
        clockState.seconds,
        digitalAmPm
    )

    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp, vertical = 12.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Digital Readout HUD
        Surface(
            shape = RoundedCornerShape(24.dp),
            color = Color(0x22FFFFFF),
            modifier = Modifier.padding(bottom = 16.dp)
        ) {
            Column(
                modifier = Modifier.padding(horizontal = 24.dp, vertical = 10.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = digitalTimeStr,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace,
                    color = Color.White,
                    letterSpacing = 2.sp
                )
                Text(
                    text = "${clockState.formattedDate} • ${clockState.timezone}",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium,
                    color = Color(0xFFB0B0B8)
                )
            }
        }

        // Motion Physics Selector (Sweeping vs Ticking)
        Surface(
            shape = RoundedCornerShape(28.dp),
            color = Color(0xFF1E2029),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(4.dp),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                ClockMotionMode.values().forEach { mode ->
                    val isSelected = settings.motionMode == mode
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(24.dp))
                            .background(if (isSelected) Color(0xFFAD0D18) else Color.Transparent)
                            .clickable { onMotionModeChange(mode) }
                            .padding(vertical = 10.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = mode.title,
                            fontSize = 12.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                            color = if (isSelected) Color.White else Color(0xFF8E8E93)
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Sound Toggle & Theme Selector Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Sound Button
            Surface(
                shape = RoundedCornerShape(20.dp),
                color = if (settings.isSoundEnabled) Color(0xFF2E7D32) else Color(0xFF262833),
                modifier = Modifier
                    .clickable { onSoundToggle() }
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Icon(
                        imageVector = if (settings.isSoundEnabled) Icons.Default.VolumeUp else Icons.Default.VolumeOff,
                        contentDescription = "Tick Audio",
                        tint = Color.White,
                        modifier = Modifier.size(16.dp)
                    )
                    Text(
                        text = if (settings.isSoundEnabled) "Tick Sound: ON" else "Sound: Muted",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color.White
                    )
                }
            }

            // Dial Theme Selector Chips
            Row(
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                ClockDialStyle.values().forEach { style ->
                    val isSelected = settings.dialStyle == style
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(
                                when (style) {
                                    ClockDialStyle.OBSIDIAN -> Color(0xFF14151B)
                                    ClockDialStyle.IVORY -> Color(0xFFE8E2DC)
                                    ClockDialStyle.MINIMALIST -> Color(0xFF00E5FF)
                                }
                            )
                            .clickable { onDialStyleChange(style) }
                            .padding(if (isSelected) 3.dp else 0.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(24.dp)
                                .clip(CircleShape)
                                .background(
                                    if (isSelected) Color(0xFFAD0D18) else Color.Transparent
                                )
                        )
                    }
                }
            }
        }
    }
}
